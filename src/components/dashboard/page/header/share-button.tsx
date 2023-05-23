import { Button, Col, Icons, Popover, Row, Tooltip } from "core/components";
import React, { useEffect, useState } from "react";
import Switch from "core/components/forms/switch";
import { sharePageToWeb } from "lib/request-by-swr/page";
import { Toast, toast } from "core/components";
import { usePathname, useRouter } from "next/navigation";
import hotToast from "react-hot-toast";
import Title from "components/common/title";

export default function ShareButton({ page, triggerShortcutShare }) {
  const router = useRouter()
  const pathName = usePathname()
  const [state, setState] = useState({
    showPopover: false,
    shareToWeb: page.shareToWeb,
    webLink: ''
  })

  function getWebLink() {
    if (!pathName) return
    let arrStr = pathName.split('/')
    arrStr[1] = arrStr[1] + '.camille.site'
    return window.location.host + arrStr.join('/')
  }

  async function copyToClipBoard() {
    try {
      await navigator.clipboard.writeText(getWebLink() as string);
      hotToast.custom(
        ({ visible }) => (
          <Toast
            visible={visible}
            className="bg-black text-white"
          >
            {
              <Toast.Description>
                <p className='font-semibold'>Copied link to clipboard!</p> {' '}
              </Toast.Description>
            }
          </Toast>
        ),
        { duration: 3000, position: 'bottom-center' }
      )

    } catch (err) {
      console.log('dauphaihau debug: err', err)
      // setCopySuccess('Failed to copy!');
    }
  }

  useEffect(() => {
    setState({ ...state, showPopover: triggerShortcutShare })
  }, [triggerShortcutShare])

  async function shareToWeb() {
    setState({ ...state, shareToWeb: !page.shareToWeb })
    const response = await sharePageToWeb(page.id, { shareToWeb: !page.shareToWeb })

    if (response.code !== '200') {
      return toast({
        message: "Something went wrong.",
        type: "error",
      })
    }
    router.refresh();
  }

  return (
    <Popover
      open={state.showPopover}
      onOpenChange={(open) => setState({ ...state, showPopover: open })}
    >
      <Popover.Trigger asChild>
        <div>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button classes='text-[14px] font-medium' color='gray' variant='text' size='xs'>Share</Button>
            </Tooltip.Trigger>
            <Tooltip.Content className='ml-2.5 mr-2 mt-1'>
              <div>Share or publish to web</div>
              <div className='text-[#82817f] text-center'>⌘ + S</div>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </Popover.Trigger>

      <Popover.Content side='bottom' className='w-[500px] ml-16 mt-6 z-[1000px]'>
        <Title
          maxW={409}
          className={'font-medium px-4 pt-1.5'}
        >
          {page.title}
        </Title>
        <Row justify={'between'} align={'center'} classes={'py-2 px-4'}>
          <Row gap={2} align={'center'}>
            <Icons.earth size={25}/>
            <Col>
              <div className={'w-full text-[14px] text-ellipsis overflow-hidden leading-5'}>Share to web</div>
              <div className={'w-full text-[#848380] text-[12px] text-ellipsis overflow-hidden leading-4'}>Anyone with
                the link can view
              </div>
            </Col>
          </Row>
          <Switch
            defaultChecked={page.shareToWeb} onCheckedChange={(checked) => {
            setState({ ...state, shareToWeb: checked })
            shareToWeb()
          }}
          />
        </Row>
        {
          state.shareToWeb &&
          <Row classes={'p-4'} align='center'>
            <div
              style={{
                borderRadius: '4px 0px 0px 4px',
                boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset'
              }}
              className={'flex-1 p-2 cursor-text flex w-full bg-[#f7f7f5]'}
            >
              <input
                className={' text-sm w-full bg-transparent'}
                style={{ border: "medium none" }}
                type="text"
                value={getWebLink()}
              />
            </div>

            <Row
              style={{
                borderRadius: '0px 4px 4px 0px',
                boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
                borderStyle: 'solid solid solid none',
                // borderWidth: '1px 1px 1px medium',
                borderColor: 'rgba(55, 53, 47, 0.16) rgba(55, 53, 47, 0.16) rgba(55, 53, 47, 0.16) currentcolor',
                borderImage: 'none 100% / 1 / 0 stretch',
              }}
              align={'center'} justify={'center'}
              classes={'h-9 inline-flex text-sm px-3 cursor-pointer hover:bg-[#e1e1e1]'}
              onClick={copyToClipBoard}
            >
              Copy web link
            </Row>
          </Row>
        }

      </Popover.Content>
    </Popover>
  );
}

