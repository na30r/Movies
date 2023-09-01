import useCompany from "@/Hooks/useCompany";
import { Company } from "@/Models/Company";
import { IMAGE_PATH } from "@/utils/constants";
import { Form, Image, Select, SelectProps } from "antd";
import style from "antd/es/alert/style";
import { useState } from "react";

export function CompanySelect({ onChange }: SelectProps<string>) {
  const [companySearchSelect, setcompanySearchSelect] = useState<string>();
  const { data: companyList, isLoading: companyListisLoading } = useCompany(companySearchSelect);

  return (
    <Form.Item label="companies">
      <Select
        showSearch
        placeholder="Select an option"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={onChange}
        onSearch={(e) => e.length > 2 && setcompanySearchSelect(e)}
        style={{ width: "100%" }}
        loading={companyListisLoading}>
        {companyList?.results.map((company: Company) => (
          <Select.Option key={company.id} value={company.id}>
            <Image src={`${IMAGE_PATH}${company.logo_path}`} alt={company.name} style={{ width: 16, marginRight: 8 }} />

            {company.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
