// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {UserStory} from "../../components/Cards/stories/userStory";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import AddListDialog from '../../components/popup-dialog/Kanban-dialog/add-list/addListDialog';
// import AddTaskDialog from '../../components/popup-dialog/Kanban-dialog/add-task/addTaskDialog';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './kanban.css';
// import Paper from '@material-ui/core/Paper';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
//
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));
//
// const finalSpaceCharacters = [
//   {
//     id: 'gary',
//     title: 'Gary Goodspeed',
//     thumb: '/images/gary.png',
//   },
//   {
//     id: 'cato',
//     title: 'Little Cato',
//     thumb: '/images/cato.png',
//   },
//   {
//     id: 'kvn',
//     title: 'KVN',
//     thumb: '/images/kvn.png',
//   },
//   {
//     id: 'mooncake',
//     title: 'Mooncake',
//     thumb: '/images/mooncake.png',
//   },
//   {
//     id: 'quinn',
//     title: 'Quinn Ergon',
//     thumb: '/images/quinn.png',
//   },
//   {
//     id: 'moonssscake',
//     title: 'Mooncake',
//     thumb: '/images/mooncake.png',
//   },
//   {
//     id: 'quinnsss',
//     title: 'Quinn Ergon',
//     thumb: '/images/quinn.png',
//   },
// ];
//
// const finalSpaceCharactersxxx = [
//   {
//     id: 'garysdsd',
//     name: 'Gary Goodspeed boo',
//   },
//   {
//     id: 'dsdsds',
//     title: 'Little Cato',
//   },
//   {
//     id: 'decatou',
//     title: 'decatou',
//   },
//   {
//     id: 'sssss',
//     title: 'Little sdsds',
//   },
// ];
//
// const options = ['Edit', 'Delete'];
// const ITEM_HEIGHT = 48;
//
//  const Kanban = () => {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//
//   const [characters, updateCharacters] = useState(finalSpaceCharacters);
//   const [charactersxxx, updateCharactersxxxx] = useState(
//     finalSpaceCharactersxxx
//   );
//   console.log(charactersxxx);
//   function handleOnDragEnd(result: any) {
//     if (!result.destination) return;
//     const destination = result.destination.droppableId;
//
//     if (destination === 'hoho') {
//       const items = Array.from(characters);
//       const [reorderedItem] = items.splice(result.source.index, 1);
//       items.splice(result.destination.index, 0, reorderedItem);
//
//       updateCharacters(items);
//     }
//
//     if (destination === 'us2') {
//       const itemsxxx = Array.from(charactersxxx);
//       const [reorderedItemxxx] = itemsxxx.splice(result.source.index, 1);
//       itemsxxx.splice(result.destination.index, 0, reorderedItemxxx);
//
//       updateCharactersxxxx(itemsxxx);
//     }
//   }
//
//   return (
//     <>
//       <Grid container spacing={3} className={'control-bar'}>
//         <Grid item xs={6}>
//           <Typography variant="h6">Continues Exploration</Typography>
//         </Grid>
//
//         <Grid item xs={6}>
//           <AddListDialog />
//           <AddTaskDialog />
//         </Grid>
//       </Grid>
//
//       <Grid container direction={'row'} spacing={2} className={'board'}>
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Grid
//             item
//             xl={4}
//             lg={4}
//             md={4}
//             sm={12}
//             xs={12}
//             className={'tasks-list'}
//           >
//             <div className={'tasks'}>
//               <h5 className={'task-header'}>User Stories (2)</h5>
//             </div>
//
//             <div className={'stories-list ustories'}>
//               <Droppable droppableId="hoho">
//                 {(provided) => (
//                   <div
//                     className="hoho"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {characters.map(({ id, title }, index) => {
//                       return (
//                         <Draggable key={id} draggableId={id} index={index}>
//                           {(provided) => (
//                             <span
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                             <UserStory title={title} id={id}/>
//                             </span>
//                           )}
//                         </Draggable>
//                       );
//                     })}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </Grid>
//
//           <Grid
//             item
//             xl={4}
//             lg={4}
//             md={4}
//             sm={12}
//             xs={12}
//             className={'tasks-list'}
//           >
//             <div className={'tasks'}>
//               <div className={'task-header user-defined-list'}>
//                 <h5 className={'list-title'}>User Stories (2)</h5>
//
//                 <div className={'list-menu'}>
//                   <IconButton
//                     aria-label="more"
//                     aria-controls="long-menu"
//                     aria-haspopup="true"
//                     onClick={handleClick}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                   <Menu
//                     id="long-menu"
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={open}
//                     onClose={handleClose}
//                   >
//                     {options.map((option) => (
//                       <MenuItem
//                         key={option}
//                         selected={option === 'Pyxis'}
//                         onClick={handleClose}
//                       >
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 </div>
//               </div>
//             </div>
//
//             <div className={'stories-list ustories'}>
//               <Droppable droppableId="hoho">
//                 {(provided) => (
//                   <div
//                     className="hoho"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {characters.map(({ id, title }, index) => {
//                       return (
//                         <Draggable key={id} draggableId={id} index={index}>
//                           {(provided) => (
//                             <span
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                             <UserStory title={title} id={id}/>
//                             </span>
//                           )}
//                         </Draggable>
//                       );
//                     })}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </Grid>
//
//           <Grid
//             item
//             xl={4}
//             lg={4}
//             md={4}
//             sm={12}
//             xs={12}
//             /* TODO - if there are more than 4 2 lists dont add the done-list class */
//             className={'tasks-list done-list'}
//           >
//             <div className={'tasks'}>
//               <h5 className={'task-header'}>User Stories (2)</h5>
//             </div>
//
//             <div className={'stories-list ustories'}>
//               <Droppable droppableId="hoho">
//                 {(provided) => (
//                   <div
//                     className="hoho"
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                   >
//                     {characters.map(({ id, title }, index) => {
//                       return (
//                         <Draggable key={id} draggableId={id} index={index}>
//                           {(provided) => (
//                             <span
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                             <UserStory title={title} id={id}/>
//                             </span>
//                           )}
//                         </Draggable>
//                       );
//                     })}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           </Grid>
//         </DragDropContext>
//       </Grid>
//     </>
//   );
// };
//

export {}