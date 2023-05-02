'use client'

import React, { useEffect, useState } from "react";
import { Grid, Row, Text } from "core/components";
import Input from "core/components/forms/Input-without-rhf";
import AddMemberDialog from "components/dialog/add-member-dialog";
import { capitalizeEachWord } from "core/helpers";
import { ROLE_USER_ON_WORKSPACE } from "config/const";
import { MemberOperations } from "./member-operations";
import { useWorkspaceContext } from "../../../context/workspace-context";

export default function MemberList({ members }) {
  const [membersFiltered, setMembersFiltered] = useState(members)
  const { user } = useWorkspaceContext();

  if (!user) return null

  useEffect(() => {
    setMembersFiltered(members)
  }, [members])

  const handleSearch = (e) => {
    const value = e.target.value
    if (!value) {
      setMembersFiltered(members)
    } else {
      setMembersFiltered(
        membersFiltered.filter((data) => {
          return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
        })
      )
    }
  }

  const currentUserIsAdmin = members.find(m => m.user.id === user.id).role === ROLE_USER_ON_WORKSPACE.ADMIN

  return (
    <>
      <Row justify='between'>
        <Row justify='between'>
          <Input onChange={handleSearch} id='search' placeholder='Search by name or email'/>
          {/*<Select/>*/}
        </Row>
        <AddMemberDialog/>
      </Row>

      {
        membersFiltered && membersFiltered.length > 0 && membersFiltered.map((member, index) => {
          const detailUser = member.user
          return (
            <Grid
              key={index}
              classes='items-center'
              style={{
                gridTemplateColumns: '7fr 3fr 2fr',
                columnGap: '16px',
              }}
            >
              <Row align='center' gap={3}>
                <div className='avatar bg-[#ecebea] group-hover:bg-[#dcdbda] h-8 w-8 rounded-full text-sm text-[#777572] flex justify-center items-center'>
                  {
                    detailUser.name ?
                      detailUser.name.charAt(0).toUpperCase()
                      :
                      detailUser.email.charAt(0).toUpperCase()
                  }
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-[#373530] font-semibold'>{detailUser?.name}</p>
                  <p className='text-sm text-[#373530]'>{detailUser?.email}</p>
                </div>
              </Row>
              <Text size={13}>{capitalizeEachWord(ROLE_USER_ON_WORKSPACE[member.role])}</Text>
              <Row justify='end'>
                <MemberOperations
                  members={members}
                  currentUserIsAdmin={currentUserIsAdmin}
                  member={{ ...detailUser, role: member.role }}
                />
              </Row>
            </Grid>
          )
        })
      }
    </>
  );
}
