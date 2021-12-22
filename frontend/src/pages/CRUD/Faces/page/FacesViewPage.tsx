import React, { useEffect } from 'react';
import FacesWidget from 'pages/CRUD/Faces/page/FacesWidget';
import actions from 'store/actions/faces/facesFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams } from 'react-router';

const FacesViewPage = () => {
  const loading = useTypedSelector(store => store.users.form.findLoading);
  const record = useTypedSelector(store => store.users.form.record);
  const dispatch = useDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    dispatch(actions.doFind(id))
  }, [id]);

  return (
    <React.Fragment>
      <FacesWidget
      loading={loading}
      record={record}
      />
    </React.Fragment>
  );
}

export default FacesViewPage;
