import { BookmarkFolder } from './model'
import { traverseBookmarkTree } from './repository'

describe('traverseBookmarkTree', () => {
  test('empty', () => {
    expect(traverseBookmarkTree([])).toStrictEqual([])
  })

  test('with real data', () => {
    expect(
      traverseBookmarkTree([
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      dateAdded: 1313418831679,
                      id: '140',
                      index: 1,
                      parentId: '7',
                      title: 'Google Calendar',
                      url: 'https://calendar.google.com/',
                    },
                  ],
                  dateAdded: 1313418831663,
                  dateGroupModified: 1404493187082,
                  id: '7',
                  index: 2,
                  parentId: '1',
                  title: 'Services',
                },
                {
                  dateAdded: 1313418831665,
                  id: '13',
                  index: 10,
                  parentId: '1',
                  title: 'Google',
                  url: 'http://www.google.com/',
                },
              ],
              dateAdded: 1382723181175,
              dateGroupModified: 1404553055462,
              id: '1',
              index: 0,
              parentId: '0',
              title: 'Bookmark Bar',
            },
          ],
          dateAdded: 1404629747292,
          id: '0',
          title: '',
        },
      ]),
    ).toStrictEqual<readonly BookmarkFolder[]>([
      {
        id: '1',
        title: 'Bookmark Bar',
        depth: 0,
        bookmarks: [
          {
            id: '13',
            title: 'Google',
            url: 'http://www.google.com/',
            folderID: '1',
          },
        ],
      },
      {
        id: '7',
        title: 'Services',
        depth: 1,
        bookmarks: [
          {
            id: '140',
            title: 'Google Calendar',
            url: 'https://calendar.google.com/',
            folderID: '7',
          },
        ],
      },
    ])
  })
})
