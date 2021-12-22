import React, { useEffect } from 'react';
import ReportsWidget from 'pages/CRUD/Reports/page/ReportsWidget';
import actions from 'store/actions/reports/reportsFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams } from 'react-router';

const ReportsViewPage = () => {
  const loading = useTypedSelector(store => store.users.form.findLoading);
  const record = useTypedSelector(store => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id))
  }, [id]);

  return (
    <React.Fragment>
      <ReportsWidget
      loading={loading}
      record={record}
      />
    </React.Fragment>
  );
}

export default ReportsViewPage;
