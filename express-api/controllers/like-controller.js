const { prisma } = require('../prisma/prisma-client');

const LikeController = {
    likePost: async (req, res) => {
        const { postId } = req.body;
        const userId = req.user.userId;
        
        if(!postId) {
            return res.status(400).json({ error: 'Все поля обязательны!' });
        }
        
        try {
            const post = await prisma.post.findUnique({ where: { id: postId } });
            
            if (!post) {
                return res.status(404).json({ error: 'Пост не найден!' });
            }
            
            const existingLike = await prisma.like.findFirst({
               where: { postId, userId }
            })
            
            if(existingLike) {
                return res.status(400).json({ error: 'Вы уже поставили лайк!' });
            }
            
            const like = await prisma.like.create({
                data: { postId, userId }
            })
            
            res.json(like);
        } catch(error) {
            console.log('Like post error', error);
            res.status(500).json({ error: 'Internal server error!' })
        }
    },
    
    unlikePost: async (req, res) => {
        const { id } = req.params;
        const userId = req.user.userId;
        
        if(!id) {
            return res.status(400).json({ error: 'Вы уже поставили дизлайк!' });
        }
        
        try {
            const existingLike = await prisma.like.findFirst({
                where: { postId: id, userId }
            })
            
            if(!existingLike) {
                return res.status(400).json({ error: 'Вы уже поставили дизлайк!' });
            }
            
            const like = await prisma.like.deleteMany({
                where: { postId: id, userId }
            })
            
            res.json(like);
        } catch (error) {
            console.log('Unlike post error', error);
            res.status(500).json({ error: 'Internal server error!' })
        }
    },
    
    cleanupLikes: async (req, res) => {
        try {
            await prisma.like.deleteMany({
                where: {
                    postId: {
                        notIn: (await prisma.post.findMany({ select: { id: true } })).map(post => post.id)
                    }
                }
            });
            
            res.json({ message: 'Все лайки к удаленным постам удалены!' });
        } catch (error) {
            console.log('Cleanup likes error:', error);
            res.status(500).json({ error: 'Internal server error!' });
        }
    }
}

module.exports = LikeController;