import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';

const navigation = [{ name: 'Exchange', href: 'exchanges', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AppNavBar({ user }) {
  return (
    <Disclosure as="nav" className="bg-[#212829] border-b-4 border-[#30B34A]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-14 w-auto p-1" src="https://logodix.com/logo/343812.png" alt="Workflow" />
            </div>

            <div className="flex sm:ml-24">
              <div className="flex space-x-4 items-center">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium',
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {user ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white items-center">
                    <span className="sr-only">Open user menu</span>
                    <span className="items-center px-3 text-md text-white ">{user.clientId}</span>

                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/open-order"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Open Order
                        </a>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/invoice"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Invoice
                        </a>
                      )}
                    </Menu.Item>

                    <Menu.Item onClick={() => window.localStorage.removeItem('APP_STATE')}>
                      {({ active }) => (
                        <a
                          href="/exchange"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div className="flex sm:ml-24">
              <div className="flex space-x-4 items-center">
                <a
                  href="/login"
                  className={classNames('bg-white text-[#3C4443]', 'px-3 py-2 rounded-md text-sm font-medium')}>
                  Login
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map(item => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}>
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
