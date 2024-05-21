'use client';

import React, { useEffect, useState } from 'react';

import { Grid, Input, Row } from 'core/components';
import AddMemberDialog from 'components/dialog/add-member-dialog';
import { capitalizeEachWord } from 'core/helpers';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { useGetDetailWorkspace } from 'lib/request-client/workspace';
import { useGetMembersByCurWorkspace } from 'lib/request-client/settings-member';
import { MemberOperations } from './member-operations';

export function MemberList() {
  const { data: members } = useGetMembersByCurWorkspace();
  const [membersFiltered, setMembersFiltered] = useState(members);
  const { data: { user } = {} } = useGetDetailWorkspace();

  useEffect(() => {
    setMembersFiltered(members);
  }, [members]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setMembersFiltered(members);
    } else {
      setMembersFiltered(
        membersFiltered && membersFiltered.filter((data) => {
          return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
      );
    }
  };

  const currentUserIsAdmin = members?.find(m => {
    return m.user.id === user?.id;
  })?.role === ROLE_USER_ON_WORKSPACE.ADMIN;

  return (
    <>
      <Row justify='between'>
        <Row justify='between'>
          <Input
            onChange={ handleSearch }
            id='search'
            placeholder='Search by name or email'
          />
          { /*<Select/>*/ }
        </Row>
        <AddMemberDialog />
      </Row>

      {
        membersFiltered &&
        membersFiltered.length > 0 &&
        membersFiltered.map((member, index) => {
          const detailUser = member.user;
          return (
            <Grid
              key={ index }
              classes='items-center'
              style={ {
                gridTemplateColumns: '7fr 3fr 2fr',
                columnGap: '16px',
              } }
            >
              <Row
                align='center'
                gap={ 3 }
              >
                <div className='avatar bg-accent group-hover:bg-[#dcdbda] h-8 w-8 rounded-full text-sm text-primary-medium flex justify-center items-center'>
                  {
                    detailUser.name ?
                      detailUser.name.charAt(0).toUpperCase() :
                      detailUser.email?.charAt(0).toUpperCase()
                  }
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-secondary font-semibold'>{ detailUser?.name }</p>
                  <p className='text-sm text-secondary'>{ detailUser?.email }</p>
                </div>
              </Row>
              <p className='text-sm'>{ capitalizeEachWord(ROLE_USER_ON_WORKSPACE[member.role]) }</p>
              <Row justify='end'>
                <MemberOperations
                  currentUserIsAdmin={ currentUserIsAdmin }
                  member={ { ...detailUser, role: member.role } }
                />
              </Row>
            </Grid>
          );
        })
      }
    </>
  );
}
