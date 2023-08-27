import { Form, Input } from "antd";
import { ChangeEventHandler } from "react";

interface KeywordSelectProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

export function MovieKeywordSelect({ onChange }: KeywordSelectProps) {
  return (
    <Form.Item label="keyword">
      <Input onChange={onChange} style={{ width: "100%" }} />
    </Form.Item>
  );
}
