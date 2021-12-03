const hotels = [
  {
    name: 'Merit Kensington Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/300245569.jpg?k=4aa0abf9c7c91e66d9cd6380d35b0685676988f055126d46d937bad87a99ee32&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/301166355.jpg?k=562c3119712491e5e6fa0159861ddc802c496aee6100bbd4fcad2ae4e1c60c39&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/301165257.jpg?k=5e86b90eed58a17e42fe2f94d640884267a18f1456cd3c14cf5a2c9624a85ed3&o=&hp=1',
    ],
  },
  {
    name: 'Lancaster Gate Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/197915810.jpg?k=a7d4febf2efa564959e0bcf3e10e3381b61444b1e1a5abca67556a27dfea6524&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/99877069.jpg?k=fc422cb2859bc8ea304c6a0bcb4aa3c2e7db3cdc80b1251c88b60b7804f84da2&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/99877066.jpg?k=db8eb12827f25f5ab959f11bdd3945b36722fe79e4ee9b4d32db501e9df24ba4&o=&hp=1',
    ],
  },
  {
    name: 'Point Kensington Olympia',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/202105839.jpg?k=04fba31a4aaedb61ede5ae9082d7ca17c0633ba3e3592a7bc3209cddea37671d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/202105853.jpg?k=58e20dbceab752f6cb7798799602a62958cf1ea182a496143e61e0a2467724be&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/202105925.jpg?k=37b0b64510dfa3e66582ff3ed9984a6d0219763a7312a526d142b002ff6ca8ba&o=&hp=1',
    ],
  },
  {
    name: 'The Montcalm Marble Arch',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/271835544.jpg?k=396a791deef01b28e7c80ec6ed7d115353784639711125d87c30cf5dd74054a7&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/271835546.jpg?k=b80db256ae26856a6859a82a12f9b4833263104b83857a387b423f125d8ae341&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/262287658.jpg?k=0fb48e52545402dbcb90cd0f854dfd4200607f61e6b7c3538e3bf26a65d8a878&o=&hp=1',
    ],
  },
  {
    name: "St Paul's Hotel",
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/207033761.jpg?k=645e0e3ded31e6b63ccadfdf311729c54ba5b2c84b552ac7dcb8dd480a3798e1&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/288492059.jpg?k=f2eb5808902f9ca98b0cc2d9fadaf754af2653e7af0c8093a7a3ef91591de5e8&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/255299508.jpg?k=d53d99c7ab87121bcc157a8ecceccc145bd23a52fd100c831b0fc65cd0151726&o=&hp=1',
    ],
  },
  {
    name: 'Rubens At The Palace',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/295224755.jpg?k=b7739751279246448ea8cfa42ceaf2357a322ab0550cea8d6b66d4cc93b6f40f&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/295224854.jpg?k=e6de0e1eb0719e2e5dc68bf89216364906ea7bec5154ab1978411ba579602f54&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/189540037.jpg?k=e8b6c99747e256157a6dab37152281de2dd1eb2cf9928dbf8ac8ed8e7b1cd622&o=&hp=1',
    ],
  },
  {
    name: 'Grange Beauchamp Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/112887941.jpg?k=932afa66261448fecc6a6bca3f531c7c43e36999eb65995e16cb481e3db62656&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/112888102.jpg?k=161fb56491e3b72560a4f3237c4dde7b0e302ecf156f006efb45453f3b2cbece&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/112888185.jpg?k=9b54457625896ad1dca3962b5576c9622e432b32c258b4266166e8bb9ba6f515&o=&hp=1',
    ],
  },
  {
    name: 'Euston Square Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/200890810.jpg?k=ca4a144a02ec7554779864751ffde895eac7b55a7e201bdf2c09a3d034232e9d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/200888744.jpg?k=f049243851afdb219f92abe88431cd8d57456645e144d5ef679cc09c8a878b65&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/210801704.jpg?k=89a18b28f070209221864f974f73941486480301104998f1a65ab8b45b036d7f&o=&hp=1',
    ],
  },
  {
    name: 'The Barbican Rooms',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/149210039.jpg?k=748d29c3183ced720412ce505d1a8a5ce59ccd57077a95b8f088107fe69bfbf3&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/177044695.jpg?k=7b2cca564168e2a401df0eeb65d9c1a6909bb3027ba1c3bd322ed3598a82bc7d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/225533177.jpg?k=f70d28bc8b42002469725443e1db3ef591df66c4f0e792b3a4827c7c01fa8b56&o=&hp=1',
    ],
  },
  {
    name: 'Oxford Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/257583977.jpg?k=e5621134fd543ee97e114b16b86a7483ce315bd38f4c9fc9e7a75f956370e857&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/176870655.jpg?k=dbe964988a7c334e329b9bb69ed851101815b19a2b1b24d8d0c18de540793926&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/176872831.jpg?k=1fd3c0bae9950cbfdf05087c655bcf9a16012b649ab3c42c09752fbee1823115&o=&hp=1',
    ],
  },
  {
    name: 'Fielding Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/300352395.jpg?k=5ccf75a05aa4413e9d3242720c578017653e1e3a9e3a84719564971edc1ca2a1&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/301568500.jpg?k=e1d6aebf5d340dd7c9fd51c8f00f571142a40cec25bf394c516ef2340a73e6ab&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/301567839.jpg?k=546d6987c061b1a22631bbd95ef0587f8e41b0b6d28b062bc6da6e286c41566d&o=&hp=1',
    ],
  },
  {
    name: 'Garden Court Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/219055206.jpg?k=a40ea5c9f3aeb0eb1985e72eabe5ce95383501004683ebb6f4efc45371513199&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/251245501.jpg?k=842c7e03e806172fab42e922201e2cb853e587df6691d5048ec6e0e6b1d06d14&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/250783800.jpg?k=b6ac7e5122009a010de1dc84d79de93f6d3266a208c2c0901716df939165e290&o=&hp=1',
    ],
  },
  {
    name: 'Sloane Place',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/178385148.jpg?k=223c27f9bbf7cd7811b768678d7c04e2fd75c6e35ab6c8e52d4addbbc0508c6d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/178385714.jpg?k=6c3322172ebeb1e2b99fe988952f630671032069bbe59a69c7cde460b1bb5133&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/178385490.jpg?k=2945a85719e40b6669ce004cfdb0d110c0e49a4658946df151ab32976bda7cef&o=&hp=1',
    ],
  },
  {
    name: 'Bermonds Locke',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/187117852.jpg?k=5a2805119e7d06817e12a7284eb1119042a14f56030fad6ec285f44fafc6135d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/187117841.jpg?k=e34c643eee3541f512db5ccbc0b4459b8a4982d946d20af66858ecf13c85f4ca&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/187118056.jpg?k=011086949d9164852ade750825aaa53d16775e10e5eb70f703cfded4553a545a&o=&hp=1',
    ],
  },
  {
    name: 'Montagu Place Hotel',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230046896.jpg?k=beaf60f412383cdc5fcd78c0badb377e7c291c945b9903e0c367f90ddf96a6b4&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/230046182.jpg?k=aa20a0f724b8ef9ae0ea9f3924f6b591da6dc92ec15e2cb341f2d97325508af9&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/215062034.jpg?k=28900f565cb8feb0db3ad1978c504e3ed28bfa8ecfc440cc5986d6f7c333bc24&o=&hp=1',
    ],
  },
  {
    name: 'Flemings Mayfair',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/238743434.jpg?k=c2e69958c4989ac7b73b1d62e2ad04b1edd91ba5ddcc4d5316037f2ac2bd9e8b&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/260551599.jpg?k=a5c07504099280ddbabad7a85b609377abcc6d2c4f843ccd0398c1d4291fb77e&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/238743457.jpg?k=f678cc309b152422de8512bcae358fd9010e9996d52410869de0a79d45da9d13&o=&hp=1',
    ],
  },
  {
    name: 'Leman Locke',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/140226054.jpg?k=2e83d240a0ada4bcb2e77aecd59942efcdbc64bfae15ecd5e28dbd2b9f242b10&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/140228501.jpg?k=793b080c2f4b4056988d0a73007d17b9910bc936cbd32c52f85e289a4f9c974b&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/140228599.jpg?k=95a980d5cd4fd79b01a08a4c38ceb0f70ba470c309afa324c576f93d58650c4e&o=&hp=1',
    ],
  },
  {
    name: 'The Beaufort',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107758.jpg?k=503d219ef7186b67f99b0f8eab05b35d59782c9358d067804c09dc21137d6b40&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107298.jpg?k=cd2cc2d583d4575afce65179f1a53cb3c2ba719755990790e7eeda4cfa58c5b2&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107507.jpg?k=7b2e5db258fc881b91d079a927fbdcc61fa6e81c4069fc1dfc2b442655454d4d&o=&hp=1',
    ],
  },
  {
    name: 'The Stafford London',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/198056480.jpg?k=dbda088b8cc44f8655b5b32be1a9ebb4a4b911b6e49d5ad6c9928fbcd7fa9a60&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/198064984.jpg?k=8ed57f33f1ffaf53a40356040e0914f5f1cf3c3db8d535cc7b38ebb9bd0d343c&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/198064998.jpg?k=6c48391e534c1c76778c1de11e6c2f9d949975504c1743844895e89f180b030d&o=&hp=1',
    ],
  },
  {
    name: 'Thistle Piccadilly',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107819.jpg?k=7c6d62c21a9e6b219fe7be54234fbe132ca4c7b1fc26960e85d321b72de15141&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107640.jpg?k=32b0fba10764646c074e477e4f77dd369dd5f38e9adc33676dbdfab63f107b48&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306107520.jpg?k=263520ce01e603b83f11c65df93df17e55a0512d35b021543b8bcee51dba4f07&o=&hp=1',
    ],
  },
  {
    name: 'Chapter Highbury I',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306994152.jpg?k=2213a82ec6dd2fe951933f7722fe17abbcc57d27a7edc188719c493f6e70d23d&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306994148.jpg?k=58e28394d2df089abdaf4b8aa94984d1fefc27760746b4f67bca806e2c145c5f&o=&hp=1',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/306994101.jpg?k=f3b75ec65858429da5d4b31c290b344179bd5619ec3bc9efef1891cf293760cc&o=&hp=1',
    ],
  },
]

export default hotels
