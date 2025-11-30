import prisma from "../utils/prisma.js"

export const getHomePage = async (req, res) => {
    const posts = await prisma.post.findMany({
        include: {author: {
            select: {
                username: true,
                email: true
            }
        }, comments: true}
    })
  res.render('home', {
    message: null,
    posts,
    title: 'MAIN PAGE',
    user: req.user || null,
    errors: null,
  });
};


export const getCreatePostPage = async(req,res) => {
  return res.render('posts/create', {
    message: null,
    title: 'CREATE A NEW POST',
    user: req.user,
    errors: null,
    data: null
  })
}


export const createPost = async(req,res) =>{
  try {
      const data = req.validatedData
  const slug =  data.title.replace(/\s+/g, '-').toLowerCase()
  const checkExistedPost = await prisma.post.findUnique({where: {slug}})
  if(checkExistedPost){
    return res.status(404).render('errors', {
        message: 'THIS POST TITLE ALREADY EXISTS IN THE DATABASE!',
        errors: null,
        user: req.user,
        redirect: 'new',
      });
  }
  const newPost = {...data, author_id: req.user.id, slug}
  const createdPost = await prisma.post.create({data: newPost, include: {comments: {include: {author: true}}, likes: true}})
  return res.render('posts/getOnePost', {
    message: `SUCCESSFULLY CREATED A NEW POST`,
    errors: null,
    post: createdPost,
    user: req.user
  })
  } catch (error) {
    return res.render('errors', {
      message: error.message,
    redirect: 'home'
    })
  }

}

export const getOnePost = async(req,res) =>{
  try {
      const {id} = req.params
      const post = await prisma.post.findUnique({where : {id}, include: {comments: {include: {author: true}}, likes: true}})
      if(!post){
        return res.render('errors', {
          message: `NOT FOUND SUCH A POST ID!`,
          data: null,
          user: req.user,
          redirect: 'home'
        })
      }
      return res.render('posts/getOnePost', {
        message: `SUCCESSFULLY RETRIEVED ONE POST FROM DATABASE`,
        post,
        user: req.user,
        errors: null
      })
  } catch (error) {
    return res.render('errors', {
      message: error.message,
      redirect: 'home'
    })
  }
  }

export const deletePost = async(req,res) =>{
  try {
      const id  = req.params.id
      console.log(id)
      const checkPost = await prisma.post.findUnique({where: {id: id}})
      if(!checkPost){
        return res.render('errors', {
          message: `NOT FOUND SUCH A POST ID!`,
          data: null,
          user: req.user,
          redirect: 'home'
        })
      }
      console.log(req.user.id)
      console.log(checkPost.author_id)
      if(checkPost.author_id !== req.user.id){
        return res.render('errors', {
          message: `YOU CANNOT DELETE OTHER PEOPLE'S POST, ONLY DELETE YOUR OWN POSTS!`,
          data: null,
          user: req.user,
          redirect: 'home'
        })
      }
      await prisma.post.delete({where: {id}})
      const posts = await prisma.post.findMany({include: {comments: {include: {author: true}}, likes: true}})
      return res.render('home', {
        message: `SUCCESSFULLY DELETED A POST, title: ${checkPost.title}`,
        user: req.user,
        posts,
        errors: null,
        data: null,
        redirect: 'home'
      })
  } catch (error) {
     console.log(error.message);
    return res.render('errors', {
      message: error.message,
      redirect: 'home'
    })
  }
}

export const getEditPage = async(req,res) =>{
  const post = await prisma.post.findUnique({where: {id: req.params.id}, include: {comments: {include: {author: true}}, likes: true}})
  if(!post){
    return res.render('errors', {
      message: `NOT FOUND SUCH A POST ID!`,
      errors: null,
      redirect: 'errors'
    })
  }
  return res.render('posts/edit', {
    message: null,
    error: null,
    post,
    user: req.user
  })
}

export const editPost = async(req,res) =>{
  try {
  const id = req.params.id
  const data = req.validatedData
  const post = await prisma.post.findUnique({where: {id}, include: {comments: {include: {author: true}}, likes: true}})
  if(!post){
   return res.render('errors', {
      message: `NOT FOUND SUCH A POST ID!`,
      errors: null,
      redirect: 'home'
    })
  }
  if(req.user.id !== post.author_id){
    return res.render('errors', {
      message: `YOU CANNOT EDIT OTHER PEOPLE'S POST`,
      redirect:"home"
    })
  }
  const editedPost = await prisma.post.update({where: {id}, data, include: {comments: {include: {author: true}}, likes: true}})
  return res.render("posts/getOnePost", {
    message: `SUCCESSFULLY UPDATED A POST`,
    user: req.user,
    errors: null,
    post: editedPost
  })
  } catch (error) {
     console.log(error.message);
    return res.render('errors', {
      message: error.message,
      redirect: 'home'
    })
  }
}


export const likePost = async(req,res) =>{
  const id = req.params.id
  const post = await prisma.post.findUnique({where: {id}, include: {comments:{include: {author: true}}, likes: true}})
  if(!post){
    return res.render('errors', {
      message: `NOT FOUND SUCH A POST ID!`,
      errors: null,
      redirect: 'home'
    })
  }
  const existedLike = await prisma.like.findFirst({where: {post_id: id, author_id: req.user.id}})
  if(existedLike){
    await prisma.like.delete({where: {id: existedLike.id}})
    return res.render("partials/messages", {
      message: `YOU SUCCESSFULLY REMOVED YOUR LIKE FROM THIS POST: ${post.title}`,
      errors: null,
      user: req.user,
      redirect: `home`
    })
  }else{
    await prisma.like.create({data: {author_id: req.user.id, post_id: id}})
    return res.render("partials/messages", {
      message: `YOU SUCCESSFULLY LIKED THIS POST: ${post.title}`,
      errors: null,
      user: req.user,
      redirect: 'home'
    })
  }
}

 export const commentPost = async(req,res) =>{
   const id = req.params.id
  const post = await prisma.post.findUnique({where: {id}, include: {comments: {include: {author: true}}, likes: true}})
  if(!post){
    return res.render('errors', {
      message: `NOT FOUND SUCH A POST ID!`,
      errors: null,
      redirect: 'home'
    })
  }
    await prisma.comment.create({data: {author_id: req.user.id, post_id: id, content: req.body.comment}})
    return res.render("partials/messages", {
      message: `YOU SUCCESSFULLY COMMENTED ON THIS POST: ${post.title}`,
      errors: null,
      user: req.user,
      redirect: `home`
 })}