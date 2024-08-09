// import { type ContentsType, ContentType } from '../..';

// interface ContentWrapperProps {
//   contents: ContentsType;
// }

// export default function ContentWrapper({ contents }: ContentWrapperProps) {
//   if (contents.type === ContentType.Reservation) {
//     return (
//       <div>
//         <h2>{contents.title}</h2>
//         <p>Status: {contents.status}</p>
//         <p>Period: {contents.period}</p>
//         <p>Price: ${contents.price}</p>
//         {contents.button}
//       </div>
//     );
//   }
//   if (contents.type === ContentType.Experience) {
//     return (
//       <div>
//         <h2>{contents.title}</h2>
//         <p>Rating: {contents.rating} / 5</p>
//         <p>Price: ${contents.price}</p>
//         {contents.button}
//       </div>
//     );
//   }
//   return <div>Invalid content type.</div>;
// }
