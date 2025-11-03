//                      PLAN LOGIC DRAFT    
//           
//                const userId = req.user.id
// getAll         const postId = await followers.findById({post_id}))


// getOne         const comment = followers.findById(req.params.id)
//                if(!comment){ NOT FOUND SUCH A COMMENT ID!}


// createOne   ->  const id = {req.validatedData.post_id}
//                   const postId = await posts.findById(id)
                // if(!postId){ return NOT FOUND} 
                // followers.create(req.validatedData)


// updateOne    
//    COMMENTID CHECKMENT: const id = {req.params.id}
//                   const id = await posts.findById(id)
                // if(!id){ return NOT FOUND SUCH A COMMNENT ID} 
//    AUTHORID CHECKMENT: 
//                 const authorId = await users.findById(req.validatedData.author_id)
                // if(!authorId){ return NOT FOUND SUCH A USER ID!} 
//    POSTID CHECKMENT: 
//                   const postId = await posts.findById(req.validatedData.post_id)
                // if(!postId){ return NOT FOUND} 
                // followers.findByIdAndUpdate(id, req.validatedData)

// deleteOne   
// COMMENTID CHECKMENT: const id = {req.params.id}
//                   const id = await posts.findById(id)
                // if(!id){ return NOT FOUND SUCH A COMMNENT ID} 
