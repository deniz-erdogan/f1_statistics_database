
import { Box, Link } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';


export default function Header({theme}){
	return (
		<Box display='flex' justifyContent='flex-end' paddingRight='10px' paddingTop='10px'>
      <Link href='https://github.com/comp306-project'  target="_blank" rel="noreferrer" underline='none'>
        <Box
          data-testid='up'
          display= 'inline-flex'
          flexWrap= 'wrap'
          alignItems= 'center'
          color= {theme.palette.text.primary}
          fontWeight= 'Medium'
          sx={[
            {
              '&:hover': {
                color: theme.palette.text.secondary,
              },
            },
          ]}
        >
					<GitHubIcon fontSize='small'/>
					<Box margin='5px' fontSize='18px'>GitHub</Box>
        </Box>
      </Link>
		</Box>
	);
}