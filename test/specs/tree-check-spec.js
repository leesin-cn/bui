
BUI.use('bui/tree/treelist',function (TreeList) {
  var nodes = [
      {text : '1',id : '1',leaf : false,checked:false,children : [{text : '11',id : '11',checked : true},{text : '12',id : '12',checked : true}]},
      {text : '2',id : '2',expanded : true,checked:false,children : [
          {text : '21',id : '21',checked : true,children : [{text : '211',id : '211',checked : false},{text : '212',id : '212',disabled:true,checked : false}]},
          {text : '22',id : '22',checked : false}
      ]},
      {text : '3',id : '3',checked : false,children : [{id : '31',checked:true,text : '31'},{id : '32',text : '32',checked:false}]},
      {text : '4',id : '4',checked : true},
      {text : '5',id : '5'},
      {text : '6',id : '6'},
      {text : '7',id : '7'}
    ];
  var tree = new TreeList({
    render : '#t3',
    showLine : true,
    nodes : nodes
  });
  tree.render();

  describe('勾选的tree',function(){

    describe('初始化勾选',function(){
      
      it('测试是否可以勾选',function(){
        var node = tree.getItem('5'),
          element = tree.findElement(node);
        expect(tree.isCheckable(node)).toBe(false);
        expect($(element).find('.x-tree-icon-checkbox').length).toBe(0);
        var node = tree.getItem('3'),
          element = tree.findElement(node);
        expect(tree.isCheckable(node)).toBe(true);
        expect($(element).find('.x-tree-icon-checkbox').length).toBe(1);
      });
      it('默认勾选的文件夹',function(){
        var node = tree.getItem('21');
        expect(tree.isChecked(node)).toBe(true);
        BUI.each(node.children,function(subNode){
          expect(subNode.checked).toBe(true);
        });
      });
      it('默认部分勾选文件夹',function(){
        var node = tree.getItem('2');
        expect(tree.hasStatus(node,'partial-checked')).toBe(true);
      });
      it('默认勾选叶子节点',function(){
         var node = tree.getItem('4'),
          element = tree.findElement(node);
        expect(tree.isCheckable(node)).toBe(true);
        expect(tree.hasStatus(node,'checked')).toBe(true);
        expect($(element).find('.x-tree-icon-checkbox').length).toBe(1);
      });
      it('默认勾选所有叶子节点',function(){
         var node = tree.getItem('1');
         expect(tree.isChecked(node)).toBe(true);
         expect(tree.hasStatus(node,'partial-checked')).toBe(false);
      });
    });
    describe('勾选操作',function(){

      it('勾选子节点',function(){
        var node = tree.getItem('22');
        tree.setNodeChecked(node,true);
        expect(tree.hasStatus(node,'checked')).toBe(true);
        expect(tree.hasStatus(node.parent,'checked')).toBe(true);
        expect(tree.hasStatus(node.parent,'partial-checked')).toBe(false);
      });

      it('取消勾选子节点',function(){
        var node = tree.getItem('22');
        tree.setNodeChecked(node,false);
        expect(tree.hasStatus(node,'checked')).toBe(false);
        expect(tree.hasStatus(node.parent,'checked')).toBe(false);
        expect(tree.hasStatus(node.parent,'partial-checked')).toBe(true);
      });

      it('勾选树节点',function(){
        var node = tree.getItem('2');
        tree.setNodeChecked(node,true);
        tree.expandNode(node);
        expect(tree.hasStatus(node,'checked')).toBe(true);
        var node = tree.getItem('22');
        expect(tree.hasStatus(node,'checked')).toBe(true);
        expect(tree.hasStatus(node.parent,'partial-checked')).toBe(false);
      });

      it('取消勾选树节点',function(){
        var node = tree.getItem('2');
        tree.setNodeChecked(node,false);
        tree.expandNode(node,true);
        expect(tree.hasStatus(node,'checked')).toBe(false);
        expect(tree.hasStatus(node,'partial-checked')).toBe(false);
        var node = tree.getItem('22');
        expect(tree.hasStatus(node,'checked')).toBe(false);
        var node = tree.getItem('211');
        expect(tree.hasStatus(node,'checked')).toBe(false);
      });

      it('树节点勾中状态下，取消叶子节点勾中',function(){
        var node = tree.getItem('2');
        tree.setNodeChecked(node,true);
        expect(tree.hasStatus(node,'checked')).toBe(true);
        var subNode = tree.getItem('21');
        expect(tree.hasStatus(subNode,'checked')).toBe(true);
        tree.setNodeChecked(subNode,false);
        expect(tree.hasStatus(subNode,'checked')).toBe(false);
        expect(tree.hasStatus(node,'checked')).toBe(false);
        expect(tree.hasStatus(node,'partial-checked')).toBe(true);
      });

      it('勾选所有叶子节点',function(){
        var node = tree.getItem('2');
        tree.setNodeChecked(node,false);
        expect(tree.hasStatus(node,'checked')).toBe(false);

        expect(tree.hasStatus(tree.getItem('21'),'checked')).toBe(false);
        expect(tree.hasStatus(tree.getItem('22'),'checked')).toBe(false);
        expect(tree.hasStatus(node,'partial-checked')).toBe(false);

        tree.setNodeChecked('21',true);
        expect(tree.hasStatus(node,'partial-checked')).toBe(true);

        tree.setNodeChecked('22',true);
        expect(tree.hasStatus(node,'checked')).toBe(true);
        expect(tree.hasStatus(node,'partial-checked')).toBe(false);
      });

      it('折叠后，展开，测试节点勾选状态',function(){
        /**/
        tree.collapseNode('2');
        tree.expandNode('2');
        var node = tree.getItem('21');
        expect(tree.hasStatus(node,'checked')).toBe(true);
        
      });
    });
    
  });
  
});

/*
BUI.use(['bui/tree/treelist','bui/data'],function (TreeList,Data) {
  var nodes = [
      {text : '1',id : '1',leaf : false,checked:false,children : [{text : '11',id : '11',checked : true},{text : '12',id : '12',checked : true}]},
      {text : '2',id : '2',expanded : true,checked:false,children : [
          {text : '21',id : '21',checked : true,children : [{text : '211',id : '211',checked : false},{text : '212',id : '212',disabled:true,checked : false}]},
          {text : '22',id : '22',checked : false}
      ]},
      {text : '3',id : '3',checked : false,children : [{id : '31',checked:true,text : '31'},{id : '32',text : '32',checked:false}]},
      {text : '4',id : '4',checked : true},
      {text : '5',id : '5'},
      {text : '6',id : '6'},
      {text : '7',id : '7'}
    ];
  var store = new Data.TreeStore({
    data : nodes
  }),
  tree = new TreeList({
    render : '#t31',
    showLine : true,
    store : store
  });
  tree.render();

  describe('勾选状态下的，增删改',function(){

    it('未勾选的树节点下，添加未勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = store.add({id : '33',text:'33',checked:false},node);
      expect(subNode.checked).not.toBe(true);
      tree.expandNode(node);
      expect(tree.hasStatus(subNode,'checked')).toBe(false);
    });

    it('未勾选的树节点下，添加勾选的字节点',function(){
       var node = tree.getItem('3'),
        subNode = store.add({id : '34',text:'34',checked : true},node);
      expect(subNode.checked).toBe(true);
      expect(tree.hasStatus(subNode,'checked')).toBe(true);
      expect(tree.hasStatus(node,'checked')).toBe(false);
    });

    it('未勾选的树节点下，删除勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = tree.getItem('34');
      store.remove(subNode);
      expect(tree.hasStatus(node,'checked')).toBe(false);
    });
    it('未勾选的树节点下，删除未勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = tree.getItem('32');
      store.remove(subNode);
      expect(tree.hasStatus(node,'checked')).toBe(false);
      subNode = tree.getItem('33');
      store.remove(subNode);
      expect(tree.hasStatus(node,'checked')).toBe(true);
    });

    it('勾选的树节点下，添加未勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = store.add({id:'32',text : '32',checked : false},node);
      expect(subNode.checked).toBe(true);
      expect(tree.hasStatus(subNode,'checked')).toBe(true);
    });

    it('勾选的树节点下，添加勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = store.add({id:'33',text : '33',checked : true},node);
      expect(subNode.checked).toBe(true);
      expect(tree.hasStatus(subNode,'checked')).toBe(true);
    });

    it('勾选的树节点下，删除勾选的字节点',function(){
      var node = tree.getItem('3'),
        subNode = tree.getItem('33');
      store.remove(subNode);
      expect(tree.hasStatus(node,'checked')).toBe(true);
    });
    

  });
  
});
*/