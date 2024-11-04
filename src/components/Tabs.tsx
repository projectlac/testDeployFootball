import React, { FC, memo, ReactNode, useState } from 'react'

interface TabsProps {
  tabs: {
    label: string
    content: ReactNode
  }[]
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <>
      <div className="border-b-2 border-secondary mt-2">
        <ul className="py-2.5 text-nowrap whitespace-nowrap overflow-x-auto flex">
          {tabs.map((tab, index) => {
            return (
              <li key={index}>
                {activeTab !== index ? (
                  <span
                    key={index}
                    className="px-2.5 py-2 text-sm cursor-pointer bg-[#f0f0f0] text-primary hover:text-red mr-1.5 inline-block"
                    onClick={() => handleTabClick(index)}
                  >
                  {tab.label}
                </span>
                ) : (
                  <span key={index} className="px-2.5 py-2 text-sm cursor-pointer bg-secondary text-primary mr-1.5 inline-block">
                  {tab.label}
                </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="tab-content">{tabs[activeTab] && tabs[activeTab].content}</div>
    </>
  )
}

export default memo(Tabs)
