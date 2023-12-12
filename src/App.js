import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// const BlogPage = () => import('./pages/Blog') //u can write as a function , a function is only a valid component if it returns jsx code or something like this , thisfunc will returns a promise here import actually yeilds a promise and that's not a valid react component func to solve this problem react gives us a special function which we have to wrap around this function and that's a lazy fun  which is imported from react
const BlogPage =  lazy( () => import('./pages/Blog')) 

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          // { path: ':id', element: <PostPage />, loader: postLoader },
          // lazy loading
          // suspense component : can be used to wait for content to be loaded before actually rendering the content fallback prop
          { index: true, element: <Suspense fallback={<p>Loading...</p>}> <BlogPage /> </Suspense>, loader:()=> import('./pages/Blog').then(module => module.loader()) },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
