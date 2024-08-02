import {apiHandlerWithFormData} from '../../api/common/api';

export const SetProductDescription = async (payload:any) => {
  const apiPath = 'product-description/product-description.json';
  const result = await apiHandlerWithFormData(apiPath,payload);
  return result;
};

// export const getGenerateData = async (payloadData:any) => {
//   const apiPath = 'product-description/product-description.json';

//   const params_temp = new URLSearchParams();
//   params_temp.append('product_name', payloadData.productName);
//   params_temp.append('keywords', payloadData.keyword);
//   params_temp.append('tone', payloadData.toneType);
//   params_temp.append('instruction', payloadData.instruction);
//   params_temp.append('emojis', payloadData.emojiData);
//   params_temp.append('hashtag', payloadData.hashtagData);

//   const result = await fetch( config.baseUrlApi + apiPath, {
//     method: 'POST',
//     headers: authHeader(),
//     body: params_temp,
//   });
//   if (result) {
//     try {
//       const data = await result.json();
//       if(data.status == "error") {
//         if(data.html_message == "Access Denied" || data.html_message == "Please Login") {  
//           localStorage.clear();
//           window.location.href = config.baseUrlPanel+'login';
//         }
//         return data;
//       } else {
//         return data;
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       // Handle the error as needed
//     }
//   }
//   return 'error';
// }