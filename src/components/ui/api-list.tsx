"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import Apialert from "@/components/ui/api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origen = useOrigin();
  const baseurl = `${origen}/api/${params.storeId}`;
  return (
    <>
      <Apialert
        title="GET"
        variant="public"
        description={`${baseurl}/${entityName}`}
      />
      <Apialert
        title="GET"
        variant="public"
        description={`${baseurl}/${entityName}/{${entityIdName}}`}
      />
      <Apialert
        title="POST"
        variant="admin"
        description={`${baseurl}/${entityName}`}
      />
      <Apialert
        title="PATCH"
        variant="admin"
        description={`${baseurl}/${entityName}/{${entityIdName}}`}
      />
      <Apialert
        title="DELETE"
        variant="admin"
        description={`${baseurl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
