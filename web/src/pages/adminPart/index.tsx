// import { Notifier } from '../hooks/notifier';
import { Provider } from '../../components/Provider';
import { useStore } from '../../stores/store';
import AdminPart from './AdminPart';
import { StrictMode } from "react";
import { RequireAuth } from './RequireAuth';

function Index() {
  const store = useStore();
  return (
    <RequireAuth>
      <Provider store={store}>
        <AdminPart />
      </Provider>
    </RequireAuth>
  )
}

export default Index
