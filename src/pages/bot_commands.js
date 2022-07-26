import React, { useState } from 'react';
import data from '../constants'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function BotCommands() {
    // code here
    data.commands.sort(function (a, b) {
        return a.command.localeCompare(b.command)
    })
    const [command, setCommand] = useState('')
    const [foundCommands, setFoundCommands] = useState(data.commands)

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = data.commands.filter((command_data) => {
                return command_data.command.toLowerCase().includes(keyword.toLowerCase());
            });
            setFoundCommands(results);
        } else {
            setFoundCommands(data.commands);
        }

        setCommand(keyword);
    }

    return [(
        <div>
            <div className="mt-20" />
            <Box elevation='0' sx={{ display: { xs: 'none', sm: 'block' }, transition: 'all 0.25s linear', textAlign: 'center' }}>
                <div className={"m-auto sm:w-full md:w-3/4 lg:w-3/4 xl:w-3/4"}>
                    <TextField
                        variant="outlined"
                        label="Search Commands"
                        color="info"
                        value={command}
                        onChange={filter}
                        placeholder="Type a command..."
                        sx={{ margin: 0, paddingBottom: 2 }}
                    />
                    <TableContainer sx={{ overflow: 'auto', height: '80vh' }}>
                        <Table
                            stickyHeader
                            size={'medium'}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ transition: 'all 0.25s linear', width: '10%', backgroundColor: 'primary.dark' }} align="center">
                                        <Typography sx={{ transition: 'all 0.25s linear' }} variant="h6" color="primary.contrastText" className='pb-2' display="inline">
                                            Type
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ transition: 'all 0.25s linear', width: '20%', backgroundColor: 'primary.dark' }} align="center">
                                        <Typography sx={{ transition: 'all 0.25s linear' }} variant="h6" color="primary.contrastText" className='pb-2' display="inline">
                                            Command Usage
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ transition: 'all 0.25s linear', width: '50%', backgroundColor: 'primary.dark' }} align="center">
                                        <Typography sx={{ transition: 'all 0.25s linear' }} variant="h6" color="primary.contrastText" className='pb-2' display="inline">
                                            Description
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ transition: 'all 0.25s linear', width: '20%', backgroundColor: 'primary.dark' }} align="center">
                                        <Typography sx={{ transition: 'all 0.25s linear' }} variant="h6" color="primary.contrastText" className='pb-2' display="inline">
                                            Example
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {foundCommands && foundCommands.length > 0 ? (
                                    foundCommands.map((command_data) => (
                                        <TableRow>
                                            <TableCell sx={{ transition: 'all 0.25s linear' }} align="center">
                                                <Typography sx={{ transition: 'all 0.25s linear' }} variant="subtitle2" color="text.subtitle">
                                                    {command_data.type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ transition: 'all 0.25s linear' }} align="center">
                                                <Typography sx={{ transition: 'all 0.25s linear' }} color="text.secondary" display="inline">
                                                    {command_data.command}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ transition: 'all 0.25s linear' }} align="left">
                                                <Typography sx={{ transition: 'all 0.25s linear' }} color="text.disabled" variant="subtitle1" display="inline">
                                                    {command_data.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ transition: 'all 0.25s linear' }} align="center">
                                                <Typography sx={{ transition: 'all 0.25s linear' }} color="text.secondary" display="inline">
                                                    {command_data.example}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <h1>No results found!</h1>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </div>
    ),
    ]
}

export default BotCommands;