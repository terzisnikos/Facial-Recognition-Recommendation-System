import React, { useState, useEffect } from 'react';
import FacesForm from 'pages/CRUD/Faces/form/FacesForm';
import { push } from 'connected-react-router';
import actions from 'store/actions/faces/facesFormActions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useParams, useRouteMatch } from "react-router";

type FacesFormProps = {
  isEditing: boolean;
  isProfile: boolean;
  findLoading: boolean;
  saveLoading: boolean;
  record: {
    [rest: string]: any
  };
  onSubmit: Function;
  onCancel: Function;
  modal: any;
  currentUser?: any;
}

const FacesFormPage = (props: FacesFormProps) => {

  const record = useTypedSelector(store => store.faces.form.record);
  const findLoading = useTypedSelector(store => store.faces.form.findLoading);
  const saveLoading = useTypedSelector(store => store.faces.form.saveLoading);
  const currentUser = useTypedSelector(store => store.auth.currentUser);

  // @ts-ignore
  const {id} = useParams()
  const match = useRouteMatch()
  const dispatch = useDispatch()

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id: string, data: any) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()))
    } else {
      dispatch(actions.doCreate(data))
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(id));
    } else {
      if (isProfile()) {
        // @ts-ignore
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew())
      }
    }
    setDispatched(true);
  }, [match, dispatch])

  return (
    <React.Fragment>
      {dispatched && (
        <FacesForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        currentUser={currentUser}
        record={(isEditing() || isProfile()) ? record : {}}
        isEditing={isEditing()}
        isProfile={isProfile()}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/admin/faces'))}
        />
        )}
    </React.Fragment>
  );
}

export default FacesFormPage;
