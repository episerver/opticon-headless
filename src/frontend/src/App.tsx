import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout';
import PageComponentSelector, { PageDataLoader} from './components/PageComponentSelector';

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
       <Route index loader={PageDataLoader}  element={<PageComponentSelector />} />
       <Route path="*" loader={PageDataLoader} element={<PageComponentSelector />} />
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
