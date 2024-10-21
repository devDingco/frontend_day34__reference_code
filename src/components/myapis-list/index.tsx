"use client";

import { useEffect, useState } from "react";
import { Avatar, List, FloatButton } from "antd";
import styles from "./styles.module.css";
import useMyAppList from "./hook";
import { useRouter } from "next/navigation";

export default function MyApiList() {
  const router = useRouter();
  const { data, onClickFetch, onClickDelete, onClickEdit, onClickDetail } =
    useMyAppList();
  useEffect(() => {
    onClickFetch();
  }, []);

  return (
    <div className={styles.listBody}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={styles.listHover}
            onClick={(e) => onClickDetail(item.id, e)}
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={(e) => onClickEdit(item.id, e)}
              >
                edit
              </a>,
              <a
                key="list-loadmore-more"
                onClick={(e) => onClickDelete(item.id, e)}
              >
                delete
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<div className={styles.title}>{item.title}</div>}
              description={<div className={styles.writer}>{item.writer}</div>}
            />
            <div className={styles.contents}>{item.contents}</div>
          </List.Item>
        )}
      />
      <FloatButton onClick={() => router.push("/myapis/new")} />
    </div>
  );
}
