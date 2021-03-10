export default class likes {
    constructor(){
        this.likes =[];
    }
    addLike(id,title,author,img){
        const like = {
            id,title,author,img
        };
        this.likes.push(like);
        this.presistData();
        return like;
    };
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1);
        this.presistData();
    }
   isLiked(id) {
       return this.likes.findIndex(el => el.id===id) !== -1;
   }
   getNumLikes(){
       return this.likes.length;
   }
   presistData() {
       localStorage.setItem('likes',JSON.stringify(this.likes));
   }
   readData() {
       const storedData = JSON.parse(localStorage.getItem('likes'));
       if(storedData)
       this.likes = storedData;
   }
}