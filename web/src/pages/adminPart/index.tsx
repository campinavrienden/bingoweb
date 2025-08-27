// import { Notifier } from '../hooks/notifier';
import { Provider } from '../../components/Provider';
import { useStore } from '../../stores/store';
import AdminPart from './AdminPart';

function Index() {
  const store = useStore();
  return (
    <Provider store={store}>
      <AdminPart />
    </Provider>
  )
}

export default Index
