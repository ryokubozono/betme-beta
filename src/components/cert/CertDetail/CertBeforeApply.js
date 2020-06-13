import React from "react";
import ExamDateTable from 'components/commons/tables/ExamDateTable';
import ExamDataTable from 'components/commons/tables/ExamDataTable';
import Spacer from "components/commons/atoms/Spacer";

const CertBeforeApply = (props) => {
  return (
    <>
      <ExamDateTable cert={props.cert} />
      <Spacer />
      <ExamDataTable cert={props.cert} />
    </>
  )
}

export default CertBeforeApply;