import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './config';
import {Provider} from 'react-redux';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </Provider>,
)
