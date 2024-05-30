import axios from 'axios'

export const findAttachment = async(imgId: string) => {
    console.log("awit");
    console.log(imgId);
    await axios(`http://api.apicef.space/wp-json/wp/v2/media/${imgId}`)
    .then((res) => {return res.data.source_url})

}