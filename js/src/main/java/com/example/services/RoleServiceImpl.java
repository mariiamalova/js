package com.example.services;

import com.example.dao.RoleDao;
import com.example.dao.RoleDaoImpl;
import com.example.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;



@Service
public class RoleServiceImpl {
    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDaoImpl roleDao) {
        this.roleDao = roleDao;
    }



    public Collection<Role> getRolesByIds(int[] idRoles){
      return  roleDao.getRolesByIds(idRoles);
    }

}
