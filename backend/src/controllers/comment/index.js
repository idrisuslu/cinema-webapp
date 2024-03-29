//Errors
const BadRequestError = require("../../errors/BadRequestError");
const UnAuthenticatedError = require("../../errors/UnAuthenticatedError");

const ErrorMessage = require("../../utils/constants");

//Models
const Comment = require("../../models/comment");

//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Validations
const { validateComment, validateUpdateComment } = require("./validations");

const CreateComment = tryCatch(async (req, res) => {
  const { error, value } = validateComment(req.body);

  if (error) {
    throw error;
  }

  const newComment = await (
    await Comment.create({
      user: req.payload.user_id,
      movie_id: value.movie_id,
      body: value.body,
      parentId: value.parent_id,
    })
  ).populate("user");

  return res.send(newComment);
});

const DeleteComment = tryCatch(async (req, res) => {
  const { comment_id } = req.body;

  if (!comment_id || !req.payload.user_id) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  //Get comment
  const foundComment = await Comment.findById(comment_id);

  //Check is delete request came from the comment writer
  if (req.payload.user_id !== foundComment.user.toString()) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  //Silinecek yorumun parentId'si var ise(yani yoruma yazılan bir yorum ise) direk silinir.
  //Ve eğer parent yorum silinmişse ve hiçbir childComment'i kalmamışsa parentComment da tamamen silinir.
  if (foundComment.parentId) {
    const deletedComment = await Comment.findByIdAndDelete(comment_id).populate(
      "user"
    );
    deletedComment.isDeleted = true;
    const parentComment = await Comment.findById(deletedComment.parentId);
    const childs = await Comment.find({ parentId: deletedComment.parentId });
    //Ana yorumun alty yorumu var mı ve ana yorum silinmiş mi ona bakılır.
    if (childs.length <= 0 && parentComment.isDeletedContent) {
      await Comment.findByIdAndDelete(parentComment._id);
      // const allComments = Comment.find({ user: req.payload.user_id });
      // res.send({ allComments, deleteParent: true });
      return res.send({ deletedComment, deleteParent: true });
    }
    return res.send(deletedComment);
  }

  //Silinecek yorum parent yani ana yorum ise önce alt yorumlar var mı diye kontrol edilir.
  const childComments = await Comment.find({ parentId: foundComment._id });

  //Eğer parent yorum silinmişse ve parent yorum alt yorumlara sahipse bu metod çalışır.
  if (childComments.length > 0) {
    foundComment.body = "This comment has been deleted by the author.";
    foundComment.updatedAt = new Date();
    foundComment.isDeletedContent = true;
    //Aslında yorumu silmedik güncelledik.(Silinmiş olarak gözükecek.)
    const deletedComment = await (await foundComment.save()).populate("user");

    return res.send(deletedComment);
  }

  //Ana yoruma yazılmış alt yorum yok ise direk ana yorumu sil.
  const deletedComment = await Comment.findByIdAndDelete(foundComment._id);
  deletedComment.isDeleted = true;
  res.send(deletedComment);
});

const UpdateComment = tryCatch(async (req, res) => {
  const { error, value } = validateUpdateComment(req.body);

  if (error) {
    throw error;
  }

  //Get comment
  const foundComment = await Comment.findById(value.comment_id);

  //Check is update request came from the comment writer
  if (req.payload.user_id !== foundComment.user.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  foundComment.body = value.body;
  foundComment.updatedAt = new Date();
  const updatedComment = await foundComment.save();
  res.send(updatedComment);
});

const GetAllComments = tryCatch(async (req, res) => {
  const { movie_id } = req.params;

  if (!movie_id) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const comments = await Comment.find({ movie_id }).populate("user");
  return res.send(comments);
});

const GetUserComments = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const comments = await Comment.find({
    user: user_id,
    isDeleted: false,
  }).populate("user");
  return res.send(comments);
});

module.exports = {
  CreateComment,
  DeleteComment,
  UpdateComment,
  GetAllComments,
  GetUserComments,
};
