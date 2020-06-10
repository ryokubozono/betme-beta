import React, { useContext } from 'react';
import AppLayout from 'components/commons/layout/AppLayout';
import TopSlider from 'components/Root/TopSlider';
import SearchItem from 'components/Root/SearchItem';
import TopBread from 'components/Root/TopBread';
import MyItem from 'components/Root/MyItem';
import { AuthContext } from "hooks/Auth";

const Root = (props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <AppLayout>
        {!currentUser &&
          <TopSlider />
        }
        {currentUser &&
          <>
            <TopBread />
            <MyItem />
          </>
        }
        <SearchItem />
      </AppLayout>
    </>
  )
}

export default Root;