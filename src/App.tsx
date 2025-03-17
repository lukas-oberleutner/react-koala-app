// Import
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '@/store/tableDataSlice';
import HierarchyTable from '@/components/HierarchyTable';
import { RootState } from '@/types';
import { AppDispatch } from '@/store/store';

// Component
function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector((state: RootState) => state.tableData);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

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
