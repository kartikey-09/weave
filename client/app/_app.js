
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ChakraProvider } from '@chakra-ui/react'
import { initializeStore } from './store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAdmin } from '@/features/AdminSlice';
import { loadUser } from '@/features/UserSlice';


function MyApp({ Component, pageProps }) {
  const store = initializeStore(pageProps.initialReduxState);
  const dispatch = useDispatch();
  const router = useRouter();

  // Dispatch actions to load user and admin data on app mount
  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(loadUser());
  }, [dispatch]);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Dispatch actions to load user and admin data when route changes
      dispatch(loadAdmin());
      dispatch(loadUser());
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, dispatch]);
  
  return (
    <Provider store={store}>
      <ChakraProvider>
        
          <Component {...pageProps} />
    
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
