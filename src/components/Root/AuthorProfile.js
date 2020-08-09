import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';

const AuthorProfile = (props) => {

  return(
    <>
      <List>
        <ListItem>
          <ListItemText
            className={props.classes.title}
            primary="
              回答者プロフィール
            "
          />
        </ListItem>
      </List>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>
              ご職業
              </b>
            </TableCell>
            <TableCell>
              {props.story.job}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>
              業種
              </b>
            </TableCell>
            <TableCell>
              {props.story.biz}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>
              年齢
              </b>
            </TableCell>
            <TableCell>
              {props.story.age}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>
              性別
              </b>
            </TableCell>
            <TableCell>
              {props.story.gender}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>
              最終学歴
              </b>
            </TableCell>
            <TableCell>
              {props.story.edu}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default AuthorProfile;