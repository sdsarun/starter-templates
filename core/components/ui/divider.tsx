"use client"

import React from 'react'
import { Divider as AntdDivider, DividerProps as AntdDividerProps } from "antd"

export type DividerProps = AntdDividerProps;

export default function Divider(props: DividerProps) {
  return <AntdDivider {...props} />
}
