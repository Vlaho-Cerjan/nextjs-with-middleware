import Layout from "app/components/layout/layout";
import { ReactElement } from "react";

export default function Dashboard() {

  return (
      <>
        LoggedIn
      </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title={"loopTitle"}
      searchTitle={"Search for ..."}
      searchFunction={() => {console.log('etoga')}}
      buttonTitle={"Button"}
      buttonHref={"Upload ..."}
      >
      {page}
    </Layout>
  )
}