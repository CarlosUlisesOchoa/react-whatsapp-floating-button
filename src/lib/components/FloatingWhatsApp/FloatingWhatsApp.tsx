import { useReducer, useEffect, useCallback, useRef, useMemo } from 'react'
import { reducer } from './reducer'
import { WhatsappSVG, CloseSVG } from './Icons'
import styles from './FloatingWhatsApp.module.css'
import dummyAvatar from './assets/avatar.svg'

export interface FloatingWhatsAppProps {
  /** Callback function fires on click */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  /** Callback function fires on submit with event value passed */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  /** Callback function fires on close */
  onClose?: () => void
  /** Callback function fired when notification runs */
  onNotification?: () => void
  /** Callback function called when notification loop done */
  onLoopDone?: () => void

  /** Phone number in [intenational format](https://faq.whatsapp.com/general/contacts/how-to-add-an-international-phone-number) */
  phoneNumber: string
  /** Account Name */
  accountName?: string
  /** Set chat box height */
  chatboxHeight?: number
  /** Inline style applied to chat box */
  chatboxStyle?: React.CSSProperties
  /** CSS className applied to chat box */
  chatboxClassName?: string
  /** Change user avatar using [static assets](https://create-react-app.dev/docs/adding-images-fonts-and-files/) */
  avatar?: string
  /** Text below the account username */
  statusMessage?: string
  /** Text inside the chat box */
  initialMessageByServer?: string
  /** Message that user will send to our WhatsApp */
  initialMessageByClient?: string
  /** Text inside start chat button */
  startChatText?: string

  /** Text that will appear in the tooltip, aside the WhatsApp button */
  tooltipText?: string | null

  /** Time delay after which the initialMessageByServer is displayed (in seconds) */
  messageDelay?: number

  /** Allow notifications (Disabled after user opens the chat box) */
  notification?: boolean
  /** Time delay between notifications in seconds */
  notificationDelay?: number
  /** Repeat notifications loop */
  notificationLoop?: number
  /** Inline style applied to notification */
  notificationStyle?: React.CSSProperties
  /** CSS className applied to notification */
  notificationClassName?: string

  /** Closes the chat box if click outside the chat box */
  allowClickAway?: boolean
  /** Closes the chat box if `Escape` key is clicked */
  allowEsc?: boolean
  /** Enable / Disable dark mode */
  darkMode?: boolean
  /** Inline style  applied to the main wrapping `Div` */
  style?: React.CSSProperties
  /** CSS className applied to the main wrapping `Div` */
  className?: string

  /** Inline style applied to button */
  buttonStyle?: React.CSSProperties
  /** CSS className applied to button */
  buttonClassName?: string
}

export function FloatingWhatsApp({
  onClick,
  onSubmit,
  onClose,
  onNotification,
  onLoopDone,

  phoneNumber = '1234567890',
  accountName = 'Account Name',
  avatar = dummyAvatar,
  statusMessage = 'Typically replies within 1 hour',
  initialMessageByServer = 'Hello there! 🤝 \nHow can we help?',
  initialMessageByClient = 'Hello!, I got your contact from your website. I would like to chat with you about...',
  startChatText = 'Start chat with us',

  tooltipText = null,

  messageDelay = 2,

  allowClickAway = false,
  allowEsc = false,

  notification = true,
  notificationDelay = 60,
  notificationLoop = 0,
  notificationStyle,
  notificationClassName = 'floating-whatsapp-notification',

  buttonStyle,
  buttonClassName = 'floating-whatsapp-button',

  chatboxHeight = 320,
  chatboxStyle,
  chatboxClassName = 'floating-whatsapp-chatbox',

  darkMode = false,
  style,
  className = 'floating-whatsapp',
}: FloatingWhatsAppProps) {
  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isDelay: true,
    isNotification: false,
  })

  const timeNow = useMemo(
    () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [],
  )

  const loops = useRef(0)
  const notificationInterval = useRef(0)

  const handleNotification = useCallback(() => {
    if (!notification) return

    dispatch({ type: 'notification' })
    if (onNotification) onNotification()
    if (notificationLoop > 0) {
      loops.current += 1

      if (loops.current === notificationLoop) {
        clearInterval(notificationInterval.current)
        if (onLoopDone) onLoopDone()
      }
    }
  }, [notification, notificationLoop, onNotification, onLoopDone])

  useEffect(() => {
    const delayInSecond = notificationDelay * 1000
    if (delayInSecond < 10)
      return console.error('notificationDelay prop value must be at least 10 seconds.')

    notificationInterval.current = window.setInterval(handleNotification, delayInSecond)

    return () => clearInterval(notificationInterval.current)
  }, [handleNotification, notificationDelay])

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()

      if (isOpen) return

      clearInterval(notificationInterval.current)
      dispatch({ type: 'open' })
      setTimeout(() => dispatch({ type: 'delay' }), messageDelay * 1000)
      if (onClick) onClick(event)
    },
    [isOpen, onClick, messageDelay],
  )

  const handleClose = useCallback(() => {
    dispatch({ type: 'close' })

    if (onClose) onClose()
  }, [onClose])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Change hardcoded endpoint to env variable
    window.open(
      `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${initialMessageByClient.trim()}`,
    )
    if (onSubmit) onSubmit(event)
  }

  useEffect(() => {
    const onClickOutside = () => {
      if (!allowClickAway || !isOpen) return

      handleClose()
    }
    document.addEventListener('click', onClickOutside, false)

    return () => document.removeEventListener('click', onClickOutside)
  }, [allowClickAway, isOpen, handleClose])

  useEffect(() => {
    const onEscKey = (event: KeyboardEvent) => {
      if (!allowEsc || !isOpen) return

      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onEscKey, false)

    return () => document.removeEventListener('keydown', onEscKey)
  }, [allowEsc, isOpen, handleClose])

  return (
    <div
      className={`${styles.floatingWhatsapp} ${darkMode ? `${styles.dark} ` : ''} ${className}`}
      style={style}
    >
      {tooltipText && !isOpen && (
        <div className={styles.tooltip}>
          <span>{tooltipText}</span>
          <div className={styles.tooltipArrow}></div>
        </div>
      )}
      <div
        className={`${styles.whatsappButton} ${buttonClassName}`}
        onClick={handleOpen}
        style={buttonStyle}
        aria-hidden={!isOpen}
      >
        <WhatsappSVG />
        {isNotification && (
          <span
            className={`${styles.notificationIndicator} ${notificationClassName}`}
            style={notificationStyle}
          >
            1
          </span>
        )}
      </div>

      <div
        className={`${styles.whatsappChatBox} ${isOpen ? styles.open : styles.close} ${chatboxClassName}`}
        onClick={(event) => event.stopPropagation()}
        aria-hidden='true'
        style={{ height: isOpen ? chatboxHeight : 0, ...chatboxStyle }}
      >
        <header className={styles.chatHeader}>
          <div className={styles.avatar}>
            <img src={avatar} width='60' height='60' alt='whatsapp-avatar' />
          </div>
          <div className={styles.status}>
            <span className={styles.statusTitle}>{accountName}</span>
            <span className={styles.statusSubtitle}>{statusMessage}</span>
          </div>
          <button
            type='button'
            className={styles.close}
            onClick={handleClose}
            aria-hidden={!isOpen}
          >
            <CloseSVG />
          </button>
        </header>

        <div className={styles.preChatBody}>
          <div
            className={styles.chatBody}
            // style={{ backgroundImage: `url(${darkMode ? darkBG : lightBG})` }}
          >
            {isDelay ? (
              <div className={styles.chatBubble}>
                <div className={styles.typing}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              </div>
            ) : (
              <div className={styles.message}>
                <span className={styles.triangle} />
                <span className={styles.accountName}>{accountName}</span>
                <p className={styles.messageBody}>{initialMessageByServer}</p>
                <span className={styles.messageTime}>{timeNow}</span>
              </div>
            )}
          </div>
        </div>

        <footer className={styles.chatFooter}>
          <form className={styles.chatFooterForm} onSubmit={handleSubmit}>
            {/* NOTE: input and send button has been replaced with a single button "Start chat" */}
            <button
              disabled={!isOpen}
              type='submit'
              className={styles.startChatButton} // You will need to define this class in your CSS module
            >
              <WhatsappSVG className={styles.whatsappIconWrapper} />
              {startChatText}
            </button>
          </form>
        </footer>
      </div>
    </div>
  )
}
