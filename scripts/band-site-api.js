
export default class BandSiteApi {
    constructor(apiKey) {
        // this.apiKey = apiKey;
        this.commentUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/comments?api_key=37a62273-2e78-413f-befb-0357b75e2328';
    }

//method to post the comments
    async postComment(commentObj) {
        try {
            const response = await axios.post(this.commentUrl, commentObj)
            return response.data;
        }
        catch(error) {
            console.log('Error',error);
        }
    }
// method to get the comments
    async getComment() {
        try {
            const response = await axios.get(this.commentUrl)
        return response.data.reverse();
        } catch (error) {
            console.log('Error', error);
        }
    }
}