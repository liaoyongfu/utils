// import React from 'react';
// import 'rmc-notification/assets/index.css';
// import Notification from 'rmc-notification';
//
// enum Type {
//     info,
//     success,
//     fail
// }
//
// const getContent = (type: Type, content, duration = 3) => {
//     return Notification.newInstance({}, notification => {
//         notification.notice({
//             closeable: false,
//             content: (
//                 <Alert bsStyle={type}>
//                     {content}
//                 </Alert>
//             ),
//             duration
//         });
//     });
// };
//
// class Toast {
//     static info(content, duration){
//         return getContent('info', content, duration);
//     }
//     static fail(content, duration){
//         return getContent('danger', content, duration);
//     }
//     static success(content, duration){
//         return getContent('success', content, duration);
//     }
//     static hide(){
//         const notices = document.querySelectorAll('.rmc-notification');
//
//         notices.forEach(self => {
//             const parent = self.parentNode;
//
//             if (parent){
//                 parent.remove();
//             }
//         });
//     }
// }
//
// export default Toast;
