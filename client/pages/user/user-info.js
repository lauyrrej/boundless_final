import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'

// sidebar假資料
const sidebarData = ['吉他', '貝斯', '鍵盤樂器', '打擊樂器']

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="hero d-none d-sm-block" style={{ paddingTop: '60px' }}>
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div>
      <div className="container">
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block  col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                {sidebarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* 頁面內容 */}
          <main
            className="col-12 col-sm-10 pe-0"
            style={{
              paddingLeft: '30px',
            }}
          >
            {/* 頂部功能列 */}
            <div className="top-function-container">
              {/* 麵包屑 */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>團員募集</li>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                {/* 搜尋欄 */}
                <div className="search input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="請輸入關鍵字..."
                  />
                  <div className="search-btn btn d-flex justify-content-center align-items-center p-0">
                    <IoIosSearch size={25} />
                  </div>
                </div>

                <div className="filter-sort d-flex justify-content-between">
                  {/* 條件篩選 */}
                  <div className="filter d-flex align-items-center">
                    條件篩選
                    <FaFilter size={13} />
                  </div>
                  {/* 資料排序 */}
                  <div className="sort d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={13} />
                    </div>
                    <div className="sort-item active">新到舊</div>
                    <div className="sort-item">舊到新</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className="content">
              <div
                style={{
                  width: 1070,
                  height: 705,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 20,
                  paddingBottom: 20,
                  background: 'rgba(185, 185, 185, 0.30)',
                  borderRadius: 5,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: 5,
                  display: 'inline-flex',
                }}
              >
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#0D3652',
                      fontSize: 28,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    會員資訊
                  </div>
                  <div
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        padding: 10,
                        background: '#B9B9B9',
                        borderRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontFamily: 'Noto Sans TC',
                          fontWeight: 700,
                          wordWrap: 'break-word',
                        }}
                      >
                        預覽個人首頁
                      </div>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        background: '#18A1FF',
                        borderRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          color: 'white',
                          fontSize: 18,
                          fontFamily: 'Noto Sans TC',
                          fontWeight: 700,
                          wordWrap: 'break-word',
                        }}
                      >
                        編輯資訊
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    真實姓名
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      鍾傑元
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    暱稱
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      阿傑
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    性別
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      男
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    喜歡曲風
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      金屬、搖滾
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    演奏樂器
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      貝斯
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    公開資訊
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        width: 201,
                        paddingTop: 2,
                        paddingBottom: 2,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 5,
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 5,
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            background: '#18A1FF',
                            borderRadius: 3,
                            border: '1px #1D1D1D solid',
                          }}
                        />
                        <div
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontFamily: 'Noto Sans TC',
                            fontWeight: 400,
                            wordWrap: 'break-word',
                          }}
                        >
                          生日
                        </div>
                      </div>
                      <div
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 5,
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            background: '#18A1FF',
                            borderRadius: 3,
                            border: '1px #1D1D1D solid',
                          }}
                        />
                        <div
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontFamily: 'Noto Sans TC',
                            fontWeight: 400,
                            wordWrap: 'break-word',
                          }}
                        >
                          手機
                        </div>
                      </div>
                      <div
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 5,
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            background: '#18A1FF',
                            borderRadius: 3,
                            border: '1px #1D1D1D solid',
                          }}
                        />
                        <div
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontFamily: 'Noto Sans TC',
                            fontWeight: 400,
                            wordWrap: 'break-word',
                          }}
                        >
                          電子信箱
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    生日
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      1985-01-19
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    手機
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      0910047354
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    信箱
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      harmon4652@gmail.com
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    地址
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 38,
                      paddingTop: 3,
                      paddingBottom: 3,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      臺東縣臺東市同樂街87號6樓
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    alignSelf: 'stretch',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    display: 'inline-flex',
                  }}
                >
                  <div
                    style={{
                      color: '#124365',
                      fontSize: 16,
                      fontFamily: 'Noto Sans TC',
                      fontWeight: 700,
                      wordWrap: 'break-word',
                    }}
                  >
                    自我介紹
                  </div>
                  <div
                    style={{
                      flex: '1 1 0',
                      height: 184,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 10,
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        flex: '1 1 0',
                        textAlign: 'justify',
                        color: 'black',
                        fontSize: 16,
                        fontFamily: 'Noto Sans TC',
                        fontWeight: 400,
                        wordWrap: 'break-word',
                      }}
                    >
                      嗨，大家好，我是阿傑！我的音樂旅程始於青少年時期，當時我對貝斯的低沉與穩定的音色深感著迷。這把強而有力的樂器成為我表達情感的媒介，並啟發我不斷追求音樂創作的腳步。
                      <br />
                      我的演奏風格融合了多種音樂元素，從爵士樂的靈活性到搖滾樂的澎湃力道，我喜歡在音符之間探索各種可能性。音樂對我而言不僅僅是一種技能，更是一種生活的態度，一種能夠連結人心的語言。
                      <br />
                      在這支樂團中，我將負責打造穩固的節奏底層，並以創意豐富的貝斯線條為樂曲增色。我相信每一個音符都有其特殊的故事，而我將竭盡所能，透過貝斯的振奏，向大家傳達那些動人的音樂故事。
                      <br />
                      不論是舞台上的熱情演奏還是幕後的音樂創作，我都全心全意地致力於音樂之中。期待與你們一同創造出充滿魔力的音樂體驗，讓每一位聽眾都能沉浸在音樂的海洋中，一同感受音符的力量！
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <style jsx>{``}</style>
    </>
  )
}
