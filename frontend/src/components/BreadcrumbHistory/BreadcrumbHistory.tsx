import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
// @ts-ignore
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

type BreadcrumbHistoryProps = {
  url?: string
}

const BreadcrumbHistory = (props: BreadcrumbHistoryProps) => {
  const renderBreadCrumbs = () => {
    let url = props.url;
    let route = url!
        .split('/')
        .slice(1)
        .map((route) =>
            route
                .split('-')
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(' '),
        );
    const length = route.length;
    return route.map((item, index) => {
      let middlewareUrl =
          '/' +
          url!
              .split('/')
              .slice(1, index + 2)
              .join('/');

      return (
          <BreadcrumbItem key={uuid()}>
            {length === index + 1 ? item : <Link to={middlewareUrl}>{item}</Link>}
          </BreadcrumbItem>
      );
    });
  };

  return (
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          {renderBreadCrumbs()}
        </Breadcrumb>
      </div>
  );
};

export default BreadcrumbHistory;
