
import { useEffect } from 'react';
import useHTTP from './HTTP/http';

function AdminPart() {
  useEffect(() => {
    window.setTimeout(async () => {
      const { get } = useHTTP();
      const data = await get('/api');
      console.log("Data", await data.text());
    }, 0);
  }, []);

  return (
    <>
     <div>Admin</div>
    </>
  )
}

export default AdminPart
