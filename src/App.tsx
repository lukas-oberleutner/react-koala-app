// Import
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData } from '@/store/tableDataSlice';
import HierarchyTable from '@/components/HierarchyTable';
import { RootState } from '@/types';

// Constants
const DATA_URL = 'http://localhost:3000/react-koala-app/data/data.json';

// Component
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: načítat v tableDataSlice ???
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DATA_URL);
        const jsonData = await response.json();
        dispatch(setTableData(jsonData));
      } catch (error) {
        setError('Chyba při načítání dat.');
        console.error('Chyba při načítání dat:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const data = useSelector((state: RootState) => state.tableData.data);

  if (loading) {
    return <div>Načítám data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>Žádná data k dispozici.</div>;
  }

  console.log('test');

  return (
    <div>
      <HierarchyTable data={data} />
    </div>
  );
}

export default App;
