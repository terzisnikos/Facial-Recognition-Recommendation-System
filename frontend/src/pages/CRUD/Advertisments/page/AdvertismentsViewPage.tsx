import React, { useEffect } from 'react';
import AdvertismentsWidget from 'pages/CRUD/Advertisments/page/AdvertismentsWidget';
import actions from 'store/actions/advertisments/advertismentsFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams } from 'react-router';

const AdvertismentsViewPage = () => {
  const loading = useTypedSelector(store => store.users.form.findLoading);
  const record = useTypedSelector(store => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id))
  }, [id]);

  return (
    <React.Fragment>
      <AdvertismentsWidget
      loading={loading}
      record={record}
      />
    </React.Fragment>
  );
}

export default AdvertismentsViewPage;
