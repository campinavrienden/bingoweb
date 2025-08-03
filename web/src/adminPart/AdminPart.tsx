
import { useEffect } from 'react';
import useAPI from './http/api';

function AdminPart() {
  useEffect(() => {
    window.setTimeout(async () => {
      const { get, bingo } = useAPI();
      const data = await get();
      console.log("Data", await data);
      await bingo.stop();
    }, 0);
  }, []);

  return (
    <>
     <div>Admin</div>
    </>
  )
}

export default AdminPart
