import { cn } from "core/helpers"
import { ComponentPropsWithoutRef } from "react";


type LoadingProps = ComponentPropsWithoutRef<'img'>

export function Loading (props: LoadingProps) {
  return (
    <img
      className={cn('loading-spinner', props.className)}
      alt="Loading..."
      aria-busy="true"
      aria-live="polite"
      src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20xmlns%3Asketch%3D%22http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch%2Fns%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2024%2024%22%20version%3D%221.1%22%20data-ember-extension%3D%221%22%3E%3Cdefs%3E%3ClinearGradient%20x1%3D%2228.1542969%25%22%20y1%3D%2263.7402344%25%22%20x2%3D%2274.6289062%25%22%20y2%3D%2217.7832031%25%22%20id%3D%22linearGradient-1%22%3E%3Cstop%20stop-color%3D%22rgba(164%2C%20164%2C%20164%2C%201)%22%20offset%3D%220%25%22%2F%3E%3Cstop%20stop-color%3D%22rgba(164%2C%20164%2C%20164%2C%200)%22%20stop-opacity%3D%220%22%20offset%3D%22100%25%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20id%3D%22Page-1%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20%3E%3Cg%20transform%3D%22translate(-236.000000%2C%20-286.000000)%22%3E%3Cg%20transform%3D%22translate(238.000000%2C%20286.000000)%22%3E%3Ccircle%20id%3D%22Oval-2%22%20stroke%3D%22url(%23linearGradient-1)%22%20stroke-width%3D%224%22%20cx%3D%2210%22%20cy%3D%2212%22%20r%3D%2210%22%2F%3E%3Cpath%20d%3D%22M10%2C2%20C4.4771525%2C2%200%2C6.4771525%200%2C12%22%20id%3D%22Oval-2%22%20stroke%3D%22rgba(164%2C%20164%2C%20164%2C%201)%22%20stroke-width%3D%224%22%2F%3E%3Crect%20id%3D%22Rectangle-1%22%20fill%3D%22rgba(164%2C%20164%2C%20164%2C%201)%22%20x%3D%228%22%20y%3D%220%22%20width%3D%224%22%20height%3D%224%22%20rx%3D%228%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
    />
  )
}



// type LoadingProps = ComponentPropsWithoutRef<'svg'>
//
// export default function Loading (props: LoadingProps) {
//   return (
//     <div role="status flex justify-center items-center">
//       <svg
//         aria-hidden="true"
//         className={cn('w-3 h-3 text-gray-200 animate-spin fill-black', props.className)}
//         // className="w-3 h-3 mr-2 text-gray-200 animate-spin fill-blue-600"
//         viewBox="0 0 100 101"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//           fill="currentColor"
//         />
//         <path
//           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//           fill="currentFill"
//         />
//       </svg>
//       <span className="sr-only">Loading...</span>
//     </div>
//   )
// }
//
