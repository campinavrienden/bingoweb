// import { Notifier } from '../hooks/notifier';
import { Provider } from '../../components/Provider';
import { useStore } from '../../stores/store';
import Client from './Client';

function Index() {
  const store = useStore();
  return (
    <Provider store={store}>
      <Client />
    </Provider>
  )
}

export default Index
