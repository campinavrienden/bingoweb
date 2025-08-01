
import { useEffect } from 'react';
import useAPI from './HTTP/api';

function AdminPart() {
  useEffect(() => {
    window.setTimeout(async () => {
      const { get } = useAPI();
      const data = await get();
      console.log("Data", await data);
    }, 0);
  }, []);

  return (
    <>
     <div>Admin</div>
    </>
  )
}

export default AdminPart
