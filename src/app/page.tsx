import { Box } from "@mui/system";
import styles from "./page.module.css";

export default function Home() {
  return <main className={styles.main}>
    <Box>
      <Box component={'nav'} className='y-center' sx={{ height: '68px', justifyContent: 'space-between', color: '#FFF' }}>
        <Box sx={{ ml: '20px' }}>
          {/* <Logo /> */}
          <img src='/logo2.svg' alt='log' />
        </Box>
        <Box sx={{ mr: '20px' }}>
          {/* <I18n /> */}
          I18n
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '70vh' }}>
        <Box sx={{
          fontSize: {
            mobile: '48px',
            desktop: '100px'
          },
          mt: '40px',
          backgroundImage: 'linear-gradient(to right, #22c55e, #3b82f6)',
          color: 'transparent',
          backgroundClip: 'text',
          fontWeight: 900
        }}>
          {/* {t('slogan1')} */}
          slogan1
        </Box>
        <Box sx={{
          fontSize: {
            mobile: '48px',
            desktop: '100px'
          },
          mb: '40px',
          backgroundImage: 'linear-gradient(to right, #3b82f6, #a855f7)',
          color: 'transparent',
          backgroundClip: 'text',
          fontWeight: 900
        }}>
          {/* {t('slogan2')} */}
          slogan2
        </Box>

        <Box sx={{ width: '70%', textAlign: 'center', fontSize: '22px', color: '#d1d5db' }}>
          {/* {t('slogan3')} */}
          slogan3
        </Box>
        <Box sx={{ display: 'flex', mt: '60px' }}>
          {/* <HomeBtns /> */}
          HomeBtns
        </Box>
      </Box>
    </Box>
  </main>
}
