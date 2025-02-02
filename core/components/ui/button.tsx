"use client"

import React from 'react'
import { Button as AntdButton } from "antd"

export type ButtonProps = React.ComponentPropsWithRef<typeof AntdButton>;

export default function Button({ children, ...props }: ButtonProps) {
  return <AntdButton type='primary' {...props}>{children}</AntdButton>
}
